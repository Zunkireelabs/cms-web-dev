'use client';

// Nepal outline - accurately traced from Golyan reference map
// Key features: narrow western hook curving up, highly jagged Himalayan north,
// wider bulging east, smooth southern Terai border
const NEPAL_OUTLINE = `
  M 80,320
  L 65,295
  L 55,265
  L 50,235
  L 55,205
  L 65,180
  L 80,160
  L 95,145
  L 110,155
  L 125,140
  L 140,152
  L 158,135
  L 175,148
  L 195,130
  L 215,145
  L 235,125
  L 255,140
  L 280,118
  L 305,135
  L 330,115
  L 355,132
  L 385,110
  L 415,128
  L 445,105
  L 478,122
  L 510,100
  L 545,118
  L 580,95
  L 618,115
  L 655,92
  L 695,112
  L 735,88
  L 770,108
  L 805,95
  L 838,115
  L 865,135
  L 885,160
  L 900,190
  L 910,225
  L 915,265
  L 910,300
  L 895,335
  L 870,365
  L 838,388
  L 798,405
  L 752,415
  L 700,418
  L 645,412
  L 590,400
  L 535,385
  L 480,372
  L 425,365
  L 370,368
  L 320,380
  L 275,398
  L 235,420
  L 200,438
  L 168,448
  L 138,445
  L 112,430
  L 92,405
  L 78,375
  L 72,345
  L 80,320
  Z
`;

export function ProjectMap() {
  return (
    <div className="relative w-full">
      <div className="relative w-full bg-white rounded-2xl border border-neutral-200 overflow-hidden p-6 md:p-10">
        <div className="relative w-full" style={{ aspectRatio: '2.2/1' }}>
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="nepalFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d1d5db" />
                <stop offset="100%" stopColor="#9ca3af" />
              </linearGradient>
              <filter id="mapShadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.15"/>
              </filter>
            </defs>

            {/* Nepal country outline */}
            <path
              d={NEPAL_OUTLINE}
              fill="url(#nepalFill)"
              stroke="#6b7280"
              strokeWidth="2"
              filter="url(#mapShadow)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
