import { Entity } from "./nodeData";

export const getEntitiesByGraphId = async (
  graphId: string
): Promise<Entity[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/graphs/entities/${graphId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching entities by graph ID:", error);
    throw error;
  }
};
