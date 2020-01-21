export default (timestamp) => {
  return new Date(timestamp).toISOString()
    .replace(/^([^T]+)T(.+)$/,'$1')
    .replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1')
};
