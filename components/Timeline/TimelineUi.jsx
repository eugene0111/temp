"use client";
import TimelineCard from "@/components/Timeline/TimelineCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const TimelineUi = ({ timelineEvents }) => {
  const containerRef = useRef(null);
  const firstEventMarker = useRef(null);
  const lastEventRef = useRef(null);

  const [totalHeight, setTotalHeight] = useState(0);

  // 1. Setup MotionValues to bypass React Render Cycle
  const lineHeight = useMotionValue(0);

  // 2. Add Spring Physics for that "Premium" weighted feel (no jitter)
  const smoothLineHeight = useSpring(lineHeight, {
    stiffness: 500,
    damping: 40,
    restDelta: 0.001,
  });

  // Calculate the full track height
  const calculateLayout = useCallback(() => {
    if (firstEventMarker.current && lastEventRef.current) {
      const startTop =
        firstEventMarker.current.getBoundingClientRect().top + window.scrollY;
      const endBottom =
        lastEventRef.current.getBoundingClientRect().bottom + window.scrollY;
      setTotalHeight(endBottom - startTop);
    }
  }, []);

  // Update the laser line height directly via the MotionValue
  const handleScroll = useCallback(() => {
    if (firstEventMarker.current) {
      const markerRect = firstEventMarker.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;

      // Calculate how far the first marker is from the center of the screen
      const rawProgress = viewportCenter - markerRect.top;

      // Clamp the value so the line doesn't grow infinitely or shrink negatively
      const clampedProgress = Math.max(0, Math.min(rawProgress, totalHeight));

      lineHeight.set(clampedProgress);
    }
  }, [totalHeight, lineHeight]);

  useEffect(() => {
    // Initial Setup
    calculateLayout();
    handleScroll();

    // Re-calculate on resize
    const resizeObserver = new ResizeObserver(() => {
      calculateLayout();
      handleScroll();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Scroll Listener (Passive for performance)
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [calculateLayout, handleScroll]);

  return (
    <div className="relative" ref={containerRef}>
      {/* 1. Inactive Background Track (Gray) */}
      <div
        style={{ height: totalHeight }}
        className="absolute left-6 top-0 w-0.5 -translate-x-1/2 bg-white/10 md:left-1/2"
      />

      {/* 2. Active Laser Line (Neon) */}
      <motion.div
        style={{ height: smoothLineHeight }}
        className="absolute left-6 top-0 w-0.5 -translate-x-1/2 bg-neon-green shadow-[0_0_15px_1px_rgba(156,205,126,0.5)] md:left-1/2"
      >
        {/* Laser Tip (Glowing Head) */}
        <div className="absolute bottom-0 left-1/2 h-6 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-white shadow-[0_0_20px_5px_#9ccd7e]" />
      </motion.div>

      {/* 3. Event Cards */}
      <div className="relative pb-24">
        {timelineEvents.map((timelineEvent, idx) => {
          const even = (idx + 1) % 2 === 0;
          const first = idx === 0;
          const last = idx === timelineEvents.length - 1;

          // Attach refs to first and last items to measure distance
          const refProps = {};
          if (first) refProps.ref = firstEventMarker;
          if (last) refProps.ref = lastEventRef;

          return (
            <TimelineCard
              key={timelineEvent._id}
              timelineEvent={timelineEvent}
              even={even}
              {...refProps}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TimelineUi;
