// frontend/src/services/socketService.ts
import { io, Socket } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? 'https://your-production-url.com' : 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;

  connect(namespace: string): Socket {
    if (this.socket) {
      return this.socket;
    }

    this.socket = io(`${URL}${namespace}`, {
      autoConnect: false,
    });

    this.socket.connect();

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export const socketService = new SocketService();
