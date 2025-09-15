"use client";

import React, { useEffect, useState } from "react";
import Loading from "./Loading";

interface LinkBarItem {
  name: string;
  description: string;
  typeName: string;
  typeStatus: string;
  iconUrl: string;
  linkUrl: string;
  itemStatus: string;
  itemStatusStatus: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  terminatedAt: string | null;
  terminatedBy: number | null;
}

const LinkBar = () => {
  const [linkBarItems, setLinkBarItems] = useState<LinkBarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinkBarItems = async () => {
      try {
        const response = await fetch("/api/link-bar");
        const data = await response.json();

        if (response.ok) {
          setLinkBarItems(data.data || []);
        } else {
          setError(data.error || "Failed to fetch link bar items");
        }
      } catch (err) {
        console.error("Error fetching LinkBar items:", err);
        setError("Something went wrong while fetching LinkBar items");
      } finally {
        setLoading(false);
      }
    };

    fetchLinkBarItems();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {linkBarItems.map((item) => (
        <div key={item.name} className="link-bar-item">
          <img src={item.iconUrl} alt={item.name} width={24} height={24} />
          <a href={item.linkUrl}>{item.name}</a>
          <span>({item.itemStatus})</span>
        </div>
      ))}
    </div>
  );
};

export default LinkBar;
