export default async function(cb) {
  try {
    return await cb();
  } catch (error) {
    console.error(error);
  }
}
