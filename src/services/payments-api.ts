import api from "./api";

export async function getPaymentByIdClient({
  clientId,
  projectId,
}: {
  clientId: string;
  projectId: string;
}) {
  const response = await api.get(
    `/api/public/payments/${clientId}/${projectId}`,
  );

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
