import { InstructorsDto } from "@/dtos/instructors-dto";

function getRandomExpertises(): string[] {
  const all = ["React", "Next.js", "TypeScript", "Node.js", "GraphQL", "Tailwind", "Docker"];
  const shuffled = all.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 2);
}

export async function fetchRandomUser(): Promise<InstructorsDto | undefined> {
  try {
    const response = await fetch("https://randomuser.me/api/");
    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }

    const data = await response.json();
    const user = data.results[0];

    const instructor: InstructorsDto = {
      id: undefined,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      avatar: user.picture.large,
      title: "Software Engineer",
      bio: "Instrutor apaixonado por ensinar e tecnologia.",
      expertises: getRandomExpertises(),
      linkedin: `https://linkedin.com/in/${user.login.username}`,
      github: `https://github.com/${user.login.username}`,
    };

    return instructor;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
  }
}
