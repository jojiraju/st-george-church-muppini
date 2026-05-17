import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import * as z from "zod";

// Zod Schema for server-side validation
const registrationSchema = z.object({
  familyHead: z.string().min(3, "Family Head Name must be at least 3 characters"),
  spouseName: z.string().optional(),
  contactPhone: z.string().min(10, "Please enter a valid phone number"),
  emailAddress: z.string().email("Please enter a valid email address").or(z.literal("")),
  houseName: z.string().min(2, "House Name must be at least 2 characters"),
  wardName: z.string().min(1, "Please select your Parish Ward"),
  previousParish: z.string().optional(),
  membersCount: z.number().min(1, "At least 1 family member required"),
  membersDetails: z.array(
    z.object({
      name: z.string().min(1, "Member Name is required"),
      relation: z.string().min(1, "Relation is required"),
      age: z.number().min(0, "Age must be positive")
    })
  ),
  remarks: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the incoming request data
    const validationResult = registrationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Validation failed", 
          errors: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    const isVercel = !!process.env.VERCEL;

    // Define filesystem path to the local database
    // On Vercel (read-only filesystem), we write to /tmp to avoid ENOENT/EROFS errors.
    const dbPath = isVercel
      ? path.join("/tmp", "registrations.json")
      : path.join(process.cwd(), "src", "data", "registrations.json");

    // Read existing database content
    let dbContent: any[] = [];
    try {
      const fileData = await fs.readFile(dbPath, "utf-8");
      dbContent = JSON.parse(fileData);
    } catch (readError) {
      // If we are on Vercel and /tmp/registrations.json doesn't exist yet,
      // try to read the initial bundled registrations.json from process.cwd() as a seed.
      if (isVercel) {
        try {
          const bundledPath = path.join(process.cwd(), "src", "data", "registrations.json");
          const fileData = await fs.readFile(bundledPath, "utf-8");
          dbContent = JSON.parse(fileData);
        } catch (bundleReadError) {
          dbContent = [];
        }
      } else {
        dbContent = [];
      }
    }

    // Generate new record with unique ID and timestamp
    const newRecord = {
      id: `fam_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      ...validatedData,
      registeredAt: new Date().toISOString()
    };

    // Append and save back
    dbContent.push(newRecord);
    try {
      // If writing to /tmp on Vercel, make sure the directory is created
      if (isVercel) {
        await fs.mkdir("/tmp", { recursive: true });
      }
      await fs.writeFile(dbPath, JSON.stringify(dbContent, null, 2), "utf-8");
    } catch (writeError) {
      // Log write error but do NOT fail the response; prioritizing user submission success
      console.error("Failed to write registration to local filesystem database:", writeError);
    }

    // Sync with Node.js Express CMS server if online
    try {
      const expressRecord = {
        familyName: `${validatedData.houseName} Family (${validatedData.familyHead})`,
        headName: validatedData.familyHead,
        familyWard: validatedData.wardName,
        phone: validatedData.contactPhone,
        address: `${validatedData.houseName} House, ${validatedData.wardName}`,
        members: validatedData.membersDetails.map(m => ({
          name: m.name,
          relation: m.relation,
          age: m.age
        })),
        notes: validatedData.remarks || ""
      };

      const cmsBaseUrl = process.env.CMS_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const syncUrl = cmsBaseUrl.endsWith("/api") 
        ? `${cmsBaseUrl}/register-family` 
        : cmsBaseUrl.includes("/api/") 
          ? cmsBaseUrl.replace(/\/api\/?$/, "/api/register-family")
          : `${cmsBaseUrl}/api/register-family`;

      await fetch(syncUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(expressRecord)
      });
      console.log(`Synced family registration to CMS Node.js server successfully at: ${syncUrl}`);
    } catch (syncError) {
      console.warn("CMS Node.js server offline or unreachable. Saved locally in Next.js.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Family registration completed successfully",
        data: newRecord
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Backend error during family registration:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error occurred",
        error: error.message
      },
      { status: 500 }
    );
  }
}
