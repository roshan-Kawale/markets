export const updateShopkeeper = async (Data) => {
    try {
        const res = await fetch("/api/shopkeeper/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        });
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return null;
        }
        return data;
      } catch (error) {
        console.log(error.message);
        return null;
      }
}