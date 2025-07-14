export const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "draft":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "archived":
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};
