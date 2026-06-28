export const connectDB = async () => {
  // Placeholder DB hook so the app can run before real DB integration.
  const mode = process.env.NODE_ENV || "development";
  console.log(`[db] initialized in ${mode} mode`);
};
