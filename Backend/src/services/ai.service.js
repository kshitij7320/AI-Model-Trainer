export const buildTrainingPlan = async ({
  modelType,
  datasetSize,
  objective,
  userName,
}) => {
  const normalizedModel = modelType || "Transformer";
  const size = Number(datasetSize) > 0 ? Number(datasetSize) : 100000;
  const goal = objective || "maximize validation accuracy";

  const epochs = size > 500000 ? 30 : 15;
  const batchSize = size > 500000 ? 64 : 32;

  return {
    summary: `Plan generated for ${userName || "team"}: train a ${normalizedModel} model to ${goal}.`,
    recommendations: [
      `Use ${epochs} epochs with early stopping enabled.`,
      `Start with batch size ${batchSize} and monitor GPU utilization.`,
      "Track precision, recall, and F1 score per epoch.",
    ],
    estimatedDurationHours: size > 500000 ? 6 : 2,
  };
};
