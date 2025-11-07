
import React from 'react';
import type { Concept } from './types';

const BrainIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.9-3.21 2.5 2.5 0 0 1 .43-4.24 2.5 2.5 0 0 1 3.15-3.39 2.5 2.5 0 0 1 4.24-1.95A2.5 2.5 0 0 1 12 4.5V2z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.9-3.21 2.5 2.5 0 0 0-.43-4.24 2.5 2.5 0 0 0-3.15-3.39 2.5 2.5 0 0 0-4.24-1.95A2.5 2.5 0 0 0 12 4.5V2z" /></svg>
);

const UniverseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
);

const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);

const LeafIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11 20A7 7 0 0 1 4 13V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a7 7 0 0 1-7 7Z" /><path d="M12 4V2" /><path d="M7 6V2" /><path d="M17 6V2" /></svg>
);

const KeyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="7.5" cy="15.5" r="5.5" /><path d="m21 2-9.6 9.6" /><path d="m15.5 7.5 3 3L22 7l-3-3" /></svg>
);


export const CONCEPTS: Concept[] = [
  {
    id: 1,
    title: "ألغاز المستقبل والخيال العلمي",
    description: "صور تدمج التكنولوجيا المتقدمة مع الأسئلة الوجودية، وتخفي ألغازاً في تفاصيلها الرقمية والمستقبلية.",
    icon: BrainIcon
  },
  {
    id: 2,
    title: "أسرار العوالم الموازية",
    description: "لوحات فنية تستكشف أكواناً بديلة وقوانين فيزيائية مختلفة، وتحتوي على ألغاز تتحدى مفاهيم الواقع.",
    icon: UniverseIcon
  },
  {
    id: 3,
    title: "فن سريالي ورقمي",
    description: "إبداعات تتحدى المنطق وتدمج الأحلام بالكوابيس، حيث يكون اللغز هو تفسير الرموز السريالية نفسها.",
    icon: EyeIcon
  },
  {
    id: 4,
    title: "أحاجي التاريخ والماضي",
    description: "صور تعيد تصور أحداث تاريخية غامضة أو شخصيات أسطورية، وتتضمن ألغازاً مخفية في القطع الأثرية أو الرموز القديمة.",
    icon: ClockIcon
  },
  {
    id: 5,
    title: "رموز الطبيعة والبيئة",
    description: "مشاهد طبيعية ساحرة بشكل غير عادي، تحتوي على ألغاز تتعلق بالأنماط الخفية في الطبيعة أو رسائل بيئية عميقة.",
    icon: LeafIcon
  },
  {
    id: 6,
    title: "غموض الجريمة والتحقيق",
    description: "صور فنية تصور مسرح جريمة أو لغز بوليسي معقد، حيث تكون الأدلة الخفية هي مفتاح حل اللغز.",
    icon: KeyIcon
  }
];