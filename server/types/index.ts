import type { Game, User, UserStats } from "@prisma/client";

export interface JWTPayload {
  id: string;
  username: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest {
  username: string;
  password: string;
  email?: string;
}

export interface GameState {
  player: PlayerState;
  opponent: PlayerState;
  currentTurn: number;
}

export interface PlayerState {
  board: number[][];
  nextPiece: string;
  score: number;
  linesCleared: number;
}

export interface WebSocketMessage {
  type: string;
  [key: string]: any;
}

export interface GameWithRelations extends Game {
  player?: User;
  opponent?: User;
}

export interface UserWithStats extends User {
  stats?: UserStats;
}

export interface GameMatchmakingResponse {
  game: Game;
  isNewGame: boolean;
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  user: {
    id: string;
    username: string;
  };
  wins: number;
  losses: number;
  draws: number;
  totalGames: number;
  highScore: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}

export interface RankResponse {
  rank: number;
  totalPlayers: number;
  percentile: string;
  stats: UserStats & {
    user: {
      username: string;
    };
  };
}
