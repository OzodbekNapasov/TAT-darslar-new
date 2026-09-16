'use client';

import {Laptop} from 'lucide-react';
import {AccessRoles} from './access-roles';
import {EhrForm} from './ehr-form';
import {FileSave} from './file-save';
import {FolderLab} from './folder-lab';
import {Homework} from './homework';

export function PracticeSection() {
  return (
    <div className="space-y-8">
      {/* section intro */}
      <div className="rounded-2xl border-2 border-teal-edge bg-surface p-6 shadow-sm sm:p-8">
        <div className="mb-3 flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-teal-ink sm:text-sm">
          <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-teal-500" />
          Amaliy mashg‘ulot • 4 ta mashq + 4 ta topshiriq
        </div>
        <h2 className="flex items-start gap-3 text-xl font-black leading-tight text-fg sm:text-2xl">
          <Laptop className="mt-0.5 h-7 w-7 shrink-0 text-teal-ink" />
          Kompyuterda ishlashni mashq qilamiz
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted sm:text-base">
          Avtomatlashtirilgan ish o‘rnida ishlash uchun avvalo Windows’da papka
          yaratish, faylni to‘g‘ri joyga saqlash va shakl to‘ldirishni bilish
          kerak. Quyidagi mashqlar aynan shuni o‘rgatadi. Oxirida —{' '}
          <strong className="text-fg">kompyuterda o‘zingiz bajaradigan 4 ta
          topshiriq</strong>.
        </p>
      </div>

      <FolderLab />
      <FileSave />
      <EhrForm />
      <AccessRoles />
      <Homework />
    </div>
  );
}
