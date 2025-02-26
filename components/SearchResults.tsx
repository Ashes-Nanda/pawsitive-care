import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface SearchResult {
  id: number;
  name: string;
  address: string;
  phone: string;
  rating: number;
  description: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  return (
    <motion.div className="space-y-4">
      <motion.h2 className="text-2xl font-bold">Search Results</motion.h2>
      {results.map((result) => (
        <motion.div key={result.id}>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{result.name}</span>
                <span className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  {result.rating}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.p className="text-sm text-gray-500">
                {result.address}
              </motion.p>
              <motion.p className="text-sm text-gray-500">
                {result.phone}
              </motion.p>
              <motion.p className="text-sm">{result.description}</motion.p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
