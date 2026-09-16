'use client';

import {Laptop} from 'lucide-react';
import {BinaryLab} from './binary-lab';
import {DesktopAnatomy} from './desktop-anatomy';
import {FileExplorerSim} from './file-explorer-sim';
import {FileTypes} from './file-types';
import {SafetySort} from './safety-sort';
import {UsbSafeEject} from './usb-safe-eject';
import {WindowControls} from './window-controls';

export function PracticeSection() {
  return (
    <div className="space-y-8">
      {/* section intro */}
      <div className="rounded-2xl border-2 border-purple-edge bg-surface p-6 shadow-sm sm:p-8">
        <div className="mb-3 flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-purple-ink sm:text-sm">
          <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-purple-500" />
          Amaliy mashg‘ulot • 7 ta mashq
        </div>
        <h2 className="flex items-start gap-3 text-xl font-black leading-tight text-fg sm:text-2xl">
          <Laptop className="mt-0.5 h-7 w-7 shrink-0 text-purple-ink" />
          Kompyuterda ishlashni o‘rganamiz
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted sm:text-base">
          Quyidagi mashqlar haqiqiy kompyuterdagi amallarning aynan o‘zi. Har
          birini bosib, o‘zgarishni ko‘ring va izohni o‘qing — shundagina
          ko‘nikma qoladi.
        </p>
      </div>

      <DesktopAnatomy />
      <WindowControls />
      <FileExplorerSim />
      <FileTypes />
      <UsbSafeEject />
      <BinaryLab />
      <SafetySort />
    </div>
  );
}
