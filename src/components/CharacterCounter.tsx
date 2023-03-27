import { motion } from 'framer-motion';

const draw = {
  transition: {
    pathLength: { type: 'spring' },
  },
};

export const CharacterCounter = (props: { charCount: number }) => {
  // Path length of the circle character indicator as a proportion of the character count
  const dashArray = 2 * Math.PI * 19;
  const dashOffset = dashArray * ((280 - props.charCount) / 280);

  let charTextColor = '#A1A1AA';

  switch (true) {
    case 280 - props.charCount <= 0:
      charTextColor = '#DC2626';
  }

  return (
    <div className="relative w-fit">
      <div className="absolute inset-0 z-10 h-full text-center">
        {280 - props.charCount <= 20 && (
          <p
            className="flex h-full items-center justify-center text-sm text-zinc-400"
            style={{ color: charTextColor }}
          >
            {280 - props.charCount}
          </p>
        )}
      </div>
      <motion.svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        initial="hidden"
        animate="visible"
        className="-rotate-90"
      >
        {280 - props.charCount > 0 && 280 - props.charCount < 280 && (
          <motion.circle
            cx="21"
            cy="21"
            r="19"
            stroke="#27272A"
            strokeWidth={2}
            custom={0}
          />
        )}
        {280 - props.charCount > 20 && (
          <motion.circle
            className="duration-150 ease-linear"
            cx="21"
            cy="21"
            r="19"
            stroke={'#f91880'}
            strokeWidth={2}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
          />
        )}
        {280 - props.charCount <= 20 && 280 - props.charCount > 0 && (
          <motion.circle
            className="duration-150 ease-linear"
            cx="21"
            cy="21"
            r="19"
            stroke={'#F59E0B'}
            strokeWidth={3}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
          />
        )}
        {280 - props.charCount <= 0 && 280 - props.charCount > -10 && (
          <motion.circle
            className="duration-150 ease-linear"
            cx="21"
            cy="21"
            r="19"
            stroke={'#DC2626'}
            strokeWidth={3}
          />
        )}
      </motion.svg>
    </div>
  );
};
