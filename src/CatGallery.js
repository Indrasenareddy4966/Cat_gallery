import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";

const API_KEY = "your-api-key"; // Replace with your actual API key
const BASE_URL = "https://api.thecatapi.com/v1/images/search";
const BREEDS_URL = "https://api.thecatapi.com/v1/breeds";

export default function CatGallery() {
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");

  useEffect(() => {
    fetchBreeds();
    fetchCats();
  }, []);

  const fetchCats = async () => {
    const breedParam = selectedBreed ? `&breed_ids=${selectedBreed}` : "";
    const response = await fetch(`${BASE_URL}?limit=9${breedParam}&api_key=${API_KEY}`);
    const data = await response.json();
    setCats(data);
  };

  const fetchBreeds = async () => {
    const response = await fetch(`${BREEDS_URL}?api_key=${API_KEY}`);
    const data = await response.json();
    setBreeds(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Random Cat Gallery</h1>
      <Select onValueChange={(value) => setSelectedBreed(value)} className="mb-4 w-64">
        <SelectItem value="">All Breeds</SelectItem>
        {breeds.map((breed) => (
          <SelectItem key={breed.id} value={breed.id}>{breed.name}</SelectItem>
        ))}
      </Select>
      <Button onClick={fetchCats} className="mb-4">Load More</Button>
      <div className="grid grid-cols-3 gap-4">
        {cats.map((cat) => (
          <Card key={cat.id}>
            <CardContent>
              <img src={cat.url} alt="Cat" className="w-full h-48 object-cover rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
