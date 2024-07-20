'use client'
import { useAuth } from '@clerk/nextjs';
import HistoryTable from "@/components/HistoryTable";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

export default function PlaceholderContent() {
  const { userId } = useAuth();
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <div className="flex flex-col relative">
            {/* <Image
              src="/placeholder.png"
              alt="Placeholder Image"
              width={500}
              height={500}
              priority
            />  */}
            <div>
              <h1>Your Roast History</h1>
              {userId ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="primary">View History</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <HistoryTable />
                  </DialogContent>
                </Dialog>
              ) : (
                <p>Please log in to view your history.</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
