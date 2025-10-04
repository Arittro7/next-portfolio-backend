import { prisma } from "../config/db";
import { envVars } from "../config/env.config";
import bcryptjs from "bcryptjs";
import { Role } from "@prisma/client"; 

export const seedAdmin = async () => {
  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: envVars.ADMIN_EMAIL },
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return;
    }

    const hashedPassword = await bcryptjs.hash(
      envVars.ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    await prisma.user.create({
      data: {
        name: "Admin",
        email: envVars.ADMIN_EMAIL,
        password: hashedPassword,
        role: Role.ADMIN,
        phone: "+8801773993397",
        isVerified: true,
        status: "ACTIVE",
        picture: null, 
      },
    });

    console.log("🎉 Admin seeded successfully");
  } catch (error) {
    console.error("❌ Error while seeding admin:", error);
  }
};