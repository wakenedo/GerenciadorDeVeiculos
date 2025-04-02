export const mockUser = {
  name: "João Silva",
  email: "joao.silva@email.com",
  rentals: [
    {
      id: 1,
      vehicle: "Toyota Corolla",
      start_date: "2024-03-01",
      end_date: "2024-03-10",
      isActive: false, // Manually set
    },
    {
      id: 2,
      vehicle: "Honda Civic",
      start_date: "2024-04-05",
      end_date: "2024-04-20",
      isActive: true, // Active rental
    },
    {
      id: 3,
      vehicle: "Ford Focus",
      start_date: "2024-04-01",
      end_date: "2024-04-30",
      isActive: true, // Active rental
    },
    {
      id: 4,
      vehicle: "Chevrolet Onix",
      start_date: "2024-03-15",
      end_date: "2024-03-25",
      isActive: false, // Inactive
    },
    {
      id: 5,
      vehicle: "Volkswagen Golf",
      start_date: "2024-04-10",
      end_date: "2024-05-05",
      isActive: true, // Active rental
    },
    {
      id: 6,
      vehicle: "Fiat Argo",
      start_date: "2024-02-01",
      end_date: "2024-02-28",
      isActive: false, // Inactive
    },
  ],
};
