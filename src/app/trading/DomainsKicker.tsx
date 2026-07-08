'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { KickerLabel } from '@/components/ui/KickerLabel';

export function DomainsKicker() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      custom={0}
      className="flex justify-center"
    >
      <KickerLabel>Specialised Domains</KickerLabel>
    </motion.div>
  );
}
