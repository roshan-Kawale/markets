export const createCustomer = async (Data) => {
    try {
        const res = await fetch("http://localhost:5000/api/customer/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({userId : Data}),
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