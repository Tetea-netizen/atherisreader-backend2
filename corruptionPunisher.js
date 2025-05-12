// Suspends user, IP, device if NPC code tampering is detected
module.exports = function punish(user) {
  console.log(`SUSPENDING USER: ${user.id} | IP: ${user.ip} | DEVICE: ${user.device}`);
  // Add logic to blacklist IP, device ID, and lock account
  user.status = 'suspended';
  return 'Access suspended due to NPC code violation.';
};
