import api from "./api";

export async function getPaymentById({
  userId,
  projectId,
  token,
  userType,
}: {
  userId: string;
  projectId: string;
  token?: string;
  userType: "client" | "developer";
}) {
  let url: string;
  let headers: Record<string, string> = {};

  if (userType === "client") {
    url = `/api/public/payments/${userId}/${projectId}`;
  } else if (userType === "developer") {
    url = `/api/developer/dashboard/${userId}/projects/${projectId}/payment`;
    headers = {
      Authorization: `Bearer ${token}`,
    };
  } else {
    throw new Error("Tipo de usuário inválido. Use 'client' ou 'developer'.");
  }

  const response = await api.get(url, { headers });
  return response.data;
}

export async function createCheckoutForProject({
  paymentId,
  projectId,
}: {
  paymentId: string;
  projectId: string;
}) {
  const response = await api.post(
    `/api/public/payments/create-session/${projectId}/${paymentId}`,
  );

  return response.data;
}

export async function createProjectPayment({
  paymentId
}: {
  paymentId: string;
}) {
  const response = await api.get(
    `/api/public/payments/success?paymentId=${paymentId}`,
  );

  return response.data;
}
