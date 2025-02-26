"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ActivityChart from "@/components/ActivityChart";
import { Sidebar } from "@/components/Sidebar";
import { LoadingScreen } from "@/components/LoadingScreen";

interface ActivityEntry {
  id: number;
  date: string;
  activityType: string;
  duration: number;
  distance?: number;
}

const mockActivityData: ActivityEntry[] = [
  {
    id: 1,
    date: "2023-06-15",
    activityType: "Walk",
    duration: 30,
    distance: 2.5,
  },
  { id: 2, date: "2023-06-15", activityType: "Play", duration: 15 },
  {
    id: 3,
    date: "2023-06-16",
    activityType: "Run",
    duration: 20,
    distance: 3.2,
  },
  { id: 4, date: "2023-06-16", activityType: "Rest", duration: 120 },
  {
    id: 5,
    date: "2023-06-17",
    activityType: "Walk",
    duration: 45,
    distance: 3.8,
  },
  { id: 6, date: "2023-06-17", activityType: "Play", duration: 25 },
  {
    id: 7,
    date: "2023-06-18",
    activityType: "Walk",
    duration: 35,
    distance: 2.9,
  },
  {
    id: 8,
    date: "2023-06-18",
    activityType: "Run",
    duration: 15,
    distance: 2.1,
  },
  {
    id: 9,
    date: "2023-06-19",
    activityType: "Walk",
    duration: 40,
    distance: 3.3,
  },
  { id: 10, date: "2023-06-19", activityType: "Play", duration: 20 },
];

export default function ActivityHistoryPage() {
  const [activityData, setActivityData] = useState<ActivityEntry[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setActivityData(mockActivityData);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const filteredData =
    filter === "all"
      ? activityData
      : activityData.filter(
          (entry) => entry.activityType.toLowerCase() === filter
        );

  const chartData = activityData.reduce((acc, entry) => {
    const existingEntry = acc.find((item) => item.date === entry.date);
    if (existingEntry) {
      if (entry.activityType === "Walk" || entry.activityType === "Run") {
        existingEntry.walkDuration += entry.duration;
        existingEntry.walkDistance += entry.distance || 0;
      } else if (entry.activityType === "Play") {
        existingEntry.playDuration += entry.duration;
      }
    } else {
      acc.push({
        date: entry.date,
        walkDuration:
          entry.activityType === "Walk" || entry.activityType === "Run"
            ? entry.duration
            : 0,
        walkDistance: entry.distance || 0,
        playDuration: entry.activityType === "Play" ? entry.duration : 0,
      });
    }
    return acc;
  }, [] as { date: string; walkDuration: number; walkDistance: number; playDuration: number }[]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-emerald-400 neon mb-6">
            TailTracker Activity History
          </h1>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityChart data={chartData} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Activities</CardTitle>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by activity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="walk">Walk</SelectItem>
                  <SelectItem value="run">Run</SelectItem>
                  <SelectItem value="play">Play</SelectItem>
                  <SelectItem value="rest">Rest</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Activity Type</TableHead>
                    <TableHead>Duration (minutes)</TableHead>
                    <TableHead>Distance (km)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.activityType}</TableCell>
                      <TableCell>{entry.duration}</TableCell>
                      <TableCell>
                        {entry.distance?.toFixed(2) || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
