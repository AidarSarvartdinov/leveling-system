import Link from 'next/link';
import { memo } from 'react';
import type { Player } from '../../types';

interface HeaderProps {
  player: Player | null;
}

function Header({ player }: HeaderProps) {
  return (
    <header className="bg-gray-900 border-b border-cyber-cyan">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="group">
              <h1 className="text-2xl font-orbitron text-cyber-cyan group-hover:text-cyan-300 transition-colors text-glow">
                SYSTEM: <span className="text-purple-500">EDUCATION MODE</span>
              </h1>
            </Link>
            
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-cyber-cyan hover:text-cyan-300 font-orbitron transition-colors">
                ГЛАВНАЯ
              </Link>
              <Link href="/courses" className="text-cyber-cyan hover:text-cyan-300 font-orbitron transition-colors">
                КУРСЫ
              </Link>
              <Link href="/statistics" className="text-cyber-cyan hover:text-cyan-300 font-orbitron transition-colors">
                СТАТИСТИКА
              </Link>
              <Link href="/quests" className="text-cyber-cyan hover:text-cyan-300 font-orbitron transition-colors">
                АРХИВ КВЕСТОВ
              </Link>
            </nav>
          </div>
          
          {player && (
            <div className="text-right">
              <div className="text-cyber-cyan font-orbitron">Уровень: {player.level}</div>
              <div className="text-green-500 text-sm">EXP: {player.experience}/{player.experienceToNextLevel}</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
