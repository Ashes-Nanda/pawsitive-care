// Update the TailTracker card section in LandingPageContent.tsx
<motion.div
  className="w-full md:w-96"
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, delay: 0.6 }}
>
  <TailTrackerCard onConnect={handleConnectTailTracker} />
</motion.div>

