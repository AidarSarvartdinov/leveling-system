import Link from 'next/link';
import type { Player } from '../../types';

interface HeaderProps {
  player: Player | null;
}

export default function Header({ player }: HeaderProps) {
  return (
    <header className="bg-gray-900 border-b border-cyber-cyan">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="group">
              <h1 className="text-2xl font-orbitron text-cyber-cyan group-hover:text-cyan-300 transition-colors text-glow">
                SYSTEM: <span className="text-cyber-purple">EDUCATION MODE</span>
              </h1>
            </Link>
            
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-cyber-cyan hover:text-cyan-300 font-orbitron transition-colors">
                ГЛАВНАЯ
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
              <div className="text-cyber-green text-sm">EXP: {player.experience}/{player.experienceToNextLevel}</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
