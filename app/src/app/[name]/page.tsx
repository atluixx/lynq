"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function UserProfile() {
  const { name } = useParams<{ name: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!name) return;

    async function fetchUser() {
      try {
        const res = await fetch(`/api/links/${name}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const d = await res.json();
        setData(d);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUser();
  }, [name]);

  if (!data) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (data?.messages?.[0]?.toLowerCase() === "user not found") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md p-6">
          <CardHeader>
            <CardTitle className="text-red-500">User Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Sorry, we couldn’t find a user named <b>{name}</b>.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userInfo = data.data || data; // adjust depending on API response

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">Hello {name}</h2>
          <div className="space-y-2">
            {Object.entries(userInfo).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between bg-muted p-2 rounded-md"
              >
                <span className="font-semibold">{key}</span>
                <span>
                  {typeof value === "object"
                    ? JSON.stringify(value)
                    : value?.toString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
