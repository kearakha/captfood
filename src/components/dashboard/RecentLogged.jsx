import RecentItem from "./RecentItem";

export default function RecentLogged() {
  const items = [
    {
      image: "https://images.unsplash.com/photo-1733105666420-729679827ba1?q=80&w=300",
      name: "Breads cheese with eggs",
      meal: "Dinner",
      calories: 230,
      protein: 20,
      carb: 10,
      fat: 9,
      time: "18.30",
    },
    {
      image: "https://images.unsplash.com/photo-1670398564097-0762e1b30b3a?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Chicken Breast",
      meal: "Lunch",
      calories: 230,
      protein: 20,
      carb: 10,
      fat: 9,
      time: "13.09",
    },
    {
      image: "https://images.unsplash.com/photo-1750127885334-5d983eb7967b?q=80&w=300",
      name: "Bubur Ayam",
      meal: "Breakfast",
      calories: 230,
      protein: 20,
      carb: 10,
      fat: 9,
      time: "09.09",
    },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Recent Logged:</h3>

      {items.map((item, i) => (
        <RecentItem key={i} item={item} />
      ))}
    </div>
  );
}
