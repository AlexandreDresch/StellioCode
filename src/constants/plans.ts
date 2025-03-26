export const plans = [
  {
    id: "c8cd5204-3a37-4722-941f-83b780280189",
    name: "BÁSICO",
    description: "Perfeito para indivíduos e pequenos projetos",
    price: "50",
    yearlyPrice: "40",
    period: "por mês",
    features: [
      "Até 3 projetos",
      "Análises básicas",
      "Tempo de resposta do suporte em até 48 horas",
      "Acesso limitado ao acompanhamento",
      "Suporte dos desenvolvedores",
    ],
    createdAt: "2025-02-22T22:15:45.943696",
    updatedAt: "2025-02-22T22:15:45.943717",
    popular: false,
    faqs: [
      {
        id: "e459b4b9-225d-4032-ae2b-bc00d8b92a1e",
        question: "Quantos projetos posso ter no plano BÁSICO?",
        answer:
          "No plano BÁSICO, você pode ter até 3 projetos ativos simultaneamente.",
      },
      {
        id: "0254b260-5ade-4da0-9e0a-f22c2da2fa34",
        question: "O que está incluído nas análises básicas?",
        answer:
          "As análises básicas incluem métricas essenciais como tempo de resposta, uso de recursos e relatórios de desempenho simplificados.",
      },
    ],
  },
  {
    id: "acc228fa-4784-4c86-8642-846a5866d5e5",
    name: "PROFISSIONAL",
    description: "Ideal para equipes em crescimento e negócios",
    price: "99",
    yearlyPrice: "79",
    period: "por mês",
    features: [
      "Projetos ilimitados",
      "Análises avançadas",
      "Tempo de resposta do suporte em até 24 horas",
      "Acesso completo ao acompanhamento",
      "Suporte prioritário",
      "Colaboração com equipe",
      "Integrações personalizadas",
    ],
    createdAt: "2025-02-22T22:19:14.069706",
    updatedAt: "2025-02-22T23:23:07.540882",
    popular: true,
  },
  {
    id: "916663e5-f5df-423b-a514-a7b1aac5a8e9",
    name: "EMPRESARIAL",
    description: "Para grandes organizações com necessidades específicas.",
    price: "299",
    yearlyPrice: "239",
    period: "por mês",
    features: [
      "Tudo no plano Profissional",
      "Soluções personalizadas",
      "Gerente de conta dedicado",
      "Tempo de resposta do suporte em até 1 hora",
      "Autenticação SSO",
      "Segurança avançada",
      "Contratos personalizados",
      "Acordo de Nível de Serviço (SLA)",
    ],
    createdAt: "2025-02-22T22:19:41.441847",
    updatedAt: "2025-02-27T23:45:02.802044",
    popular: false,
  },
];
