//components/VenueForm.tsx

import React, { useState } from "react";
import { createVenue } from "../api/venuesApi";

interface Props {
  onCreated: () => void;
  onCancel: () => void;
}

export default function VenueForm({ onCreated, onCancel }: Props) {
  const [name, setName]               = useState("");
  const [imageUrl, setImageUrl]       = useState("");
  const [price, setPrice]             = useState<number>(0);
  const [city, setCity]               = useState("");
  const [maxGuests, setMaxGuests]     = useState<number>(1);
  const [description, setDescription] = useState("");
  const [wifi, setWifi]               = useState(false);
  const [parking, setParking]         = useState(false);
  const [breakfast, setBreakfast]     = useState(false);
  const [pets, setPets]               = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      await createVenue({
        name,
        description,
        media: imageUrl ? [{ url: imageUrl }] : [],
        price,
        maxGuests,
        meta: { wifi, parking, breakfast, pets },
        location: { city },
      });
      alert("Venue created!");
      onCreated();
    } catch (err: any) {
      alert("Failed to create venue: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Create Venue</h2>

      <label className="block">
        Name
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full border rounded px-2 py-1"
        />
      </label>

      <label className="block">
        Image URL
        <input
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </label>

      <label className="block">
        Price per night
        <input
          type="number"
          value={price}
          onChange={e => setPrice(+e.target.value)}
          required
          className="w-full border rounded px-2 py-1"
        />
      </label>

      <label className="block">
        City
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </label>

      <label className="block">
        Capacity
        <input
          type="number"
          value={maxGuests}
          onChange={e => setMaxGuests(+e.target.value)}
          required
          className="w-full border rounded px-2 py-1"
        />
      </label>

      <fieldset className="flex flex-wrap gap-4">
        <label>
          <input
            type="checkbox"
            checked={wifi}
            onChange={() => setWifi(!wifi)}
          />{" "}
          Free wifi
        </label>
        <label>
          <input
            type="checkbox"
            checked={parking}
            onChange={() => setParking(!parking)}
          />{" "}
          Free parking
        </label>
        <label>
          <input
            type="checkbox"
            checked={breakfast}
            onChange={() => setBreakfast(!breakfast)}
          />{" "}
          Breakfast
        </label>
        <label>
          <input
            type="checkbox"
            checked={pets}
            onChange={() => setPets(!pets)}
          />{" "}
          Pets allowed
        </label>
      </fieldset>

      <label className="block">
        Description
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={4}
          className="w-full border rounded px-2 py-1"
        />
      </label>

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Create
        </button>
      </div>
    </form>
  );
}
