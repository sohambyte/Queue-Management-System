
import { Service, Counter, Token, TokenStatus, User, UserRole } from '../types';

// Mock DB Initial State
const INITIAL_SERVICES: Service[] = [
  { id: 1, serviceName: 'OPD General', description: 'General checkup', averageTimeMinutes: 15, status: true },
  { id: 2, serviceName: 'Pharmacy', description: 'Medicine collection', averageTimeMinutes: 5, status: true },
  { id: 3, serviceName: 'Radiology', description: 'X-Ray & Scans', averageTimeMinutes: 30, status: true },
];

const INITIAL_COUNTERS: Counter[] = [
  { id: 1, counterName: 'Counter 01', serviceId: 1, status: true },
  { id: 2, counterName: 'Counter 02', serviceId: 1, status: true },
  { id: 3, counterName: 'Counter 03', serviceId: 2, status: true },
];

let tokens: Token[] = [
  { id: 101, tokenNumber: 'OPD-001', serviceId: 1, customerName: 'John Doe', phone: '12345', status: TokenStatus.COMPLETED, createdAt: new Date(Date.now() - 3600000).toISOString(), calledAt: new Date(Date.now() - 3000000).toISOString(), completedAt: new Date(Date.now() - 1800000).toISOString(), counterId: 1 },
  { id: 102, tokenNumber: 'OPD-002', serviceId: 1, customerName: 'Jane Smith', phone: '67890', status: TokenStatus.CALLED, createdAt: new Date(Date.now() - 2400000).toISOString(), calledAt: new Date(Date.now() - 600000).toISOString(), counterId: 1 },
  { id: 103, tokenNumber: 'PHM-001', serviceId: 2, customerName: 'Alice Brown', phone: '11223', status: TokenStatus.WAITING, createdAt: new Date(Date.now() - 300000).toISOString() },
];

let services = [...INITIAL_SERVICES];
let counters = [...INITIAL_COUNTERS];

// Sequence manager for token numbers (simulating database auto-increment and business logic)
const getNextTokenNumber = (serviceId: number) => {
  const service = services.find(s => s.id === serviceId);
  if (!service) return "UNK-000";
  
  const prefix = service.serviceName.substring(0, 3).toUpperCase();
  // Filter all tokens for this service, even deleted/cancelled ones for sequence integrity
  const serviceTokens = tokens.filter(t => t.serviceId === serviceId);
  const nextSeq = serviceTokens.length + 1;
  return `${prefix}-${nextSeq.toString().padStart(3, '0')}`;
};

export const mockApi = {
  getServices: () => Promise.resolve([...services]),
  addService: (s: Omit<Service, 'id'>) => {
    const newService = { ...s, id: services.length + 1 };
    services.push(newService);
    return Promise.resolve(newService);
  },
  getCounters: () => Promise.resolve([...counters]),
  addCounter: (c: Omit<Counter, 'id'>) => {
    const newCounter = { ...c, id: counters.length + 1 };
    counters.push(newCounter);
    return Promise.resolve(newCounter);
  },
  generateToken: (data: { serviceId: number, name: string, phone: string }) => {
    return new Promise<Token>((resolve, reject) => {
      // Small timeout to simulate network latency and test UI loading states
      setTimeout(() => {
        const service = services.find(s => s.id === data.serviceId);
        if (!service) {
          reject("Service not found");
          return;
        }
        
        const tokenNumber = getNextTokenNumber(data.serviceId);
        
        const newToken: Token = {
          id: Date.now() + Math.floor(Math.random() * 1000), // Ensure more unique IDs
          tokenNumber,
          serviceId: data.serviceId,
          customerName: data.name,
          phone: data.phone,
          status: TokenStatus.WAITING,
          createdAt: new Date().toISOString()
        };
        
        tokens.push(newToken);
        resolve(newToken);
      }, 800);
    });
  },
  getActiveTokens: () => Promise.resolve([...tokens].filter(t => [TokenStatus.WAITING, TokenStatus.CALLED].includes(t.status))),
  getHistoryTokens: () => Promise.resolve([...tokens].filter(t => t.status === TokenStatus.COMPLETED)),
  callNextToken: (counterId: number) => {
    return new Promise<Token>((resolve, reject) => {
      const counter = counters.find(c => c.id === counterId);
      if (!counter) {
        reject("Counter not found");
        return;
      }
      
      // Find next waiting token for this counter's service
      const nextToken = tokens.find(t => t.serviceId === counter.serviceId && t.status === TokenStatus.WAITING);
      if (!nextToken) {
        reject("No waiting tokens for this service");
        return;
      }
      
      nextToken.status = TokenStatus.CALLED;
      nextToken.calledAt = new Date().toISOString();
      nextToken.counterId = counterId;
      resolve(nextToken);
    });
  },
  completeToken: (tokenId: number) => {
    const token = tokens.find(t => t.id === tokenId);
    if (token) {
      token.status = TokenStatus.COMPLETED;
      token.completedAt = new Date().toISOString();
    }
    return Promise.resolve(token);
  },
  cancelToken: (tokenId: number) => {
    const token = tokens.find(t => t.id === tokenId);
    if (token) {
      token.status = TokenStatus.CANCELLED;
    }
    return Promise.resolve(token);
  }
};
