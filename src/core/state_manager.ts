import State, { State_NoProxy } from './state';
import { isIE11 } from '../utilities/ie11';

type SubscriberCallback<T> = (state: T) => void;

type NestedObject<T> = {
    [K in keyof T]: T[K] extends object ? NestedObject<T[K]> : T[K];
};

class StateManager<T extends object> {
    private state: State_NoProxy<NestedObject<T>> | State<NestedObject<T>>;
    private subscribers: SubscriberCallback<T>[];

    constructor(initialState: T) {
        this.state = isIE11() ? new State_NoProxy(initialState as NestedObject<T>) : new State(initialState as NestedObject<T>);
        this.subscribers = [];
    }

    getState(): T {
        return this.state.state as T;
    }

    setState(partialState: Partial<T>): void {
        Object.assign(this.state.state, partialState);
        this.triggerSubscribers();
    }

    subscribe(callback: SubscriberCallback<T>): void {
        this.subscribers.push(callback);
    }

    private triggerSubscribers(): void {
        const currentState = this.getState();
        this.subscribers.forEach((subscriber) => subscriber(currentState));
    }

    reactive<K extends keyof T>(key: K, expression: string): void {
        this.state.reactive(key as string, `${expression}`);
    }
}

export default StateManager;
