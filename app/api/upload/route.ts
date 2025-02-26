import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const storageRef = ref(storage, `uploads/${file.name}`);
  const buffer = await file.arrayBuffer();
  const snapshot = await uploadBytes(storageRef, new Uint8Array(buffer));

  const url = await getDownloadURL(snapshot.ref);
  return NextResponse.json({ url });
}
