import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
async function createAdmin() {
  try {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await prisma.user.create({
        data: {
          name: "Admin",
          firstname: "Admin",
          email: adminEmail,
          password: hashedPassword,
          role: "admin",
        },
      });
      console.log("Admin created successfully");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
