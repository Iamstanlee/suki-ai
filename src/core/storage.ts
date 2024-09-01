import { MMKV } from 'react-native-mmkv';

type StorageData = typeof String | typeof Number | typeof Boolean;

interface IStorage {
  getItem(key: string, type?: StorageData): any;

  setItem(key: string, value: any): void;

  removeItem(key: string): void;

  clearAll(): void;

  has(key: string): Promise<boolean> | boolean;
}

export type MixpanelAsyncStorage = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

class MMVK_MIXPANEL_STORAGE implements MixpanelAsyncStorage {
  store = new MMKV({ id: 'mixpanel' });

  async getItem(key: string): Promise<string | null> {
    const value = this.store.getString(key);
    return Promise.resolve(value ?? null);
  }

  async setItem(key: string, value: string): Promise<void> {
    this.store.set(key, value);
  }

  async removeItem(key: string): Promise<void> {
    this.store.delete(key);
  }
}

class MMKV_STORAGE implements IStorage {
  store = new MMKV();

  getItem(key: string, type: StorageData = String): any {
    if (type === Number) return this.store.getNumber(key);
    if (type === Boolean) return this.store.getBoolean(key);
    return this.store.getString(key);
  }

  setItem(key: string, value: any) {
    this.store.set(key, value);
  }

  removeItem(key: string) {
    this.store.delete(key);
  }

  clearAll() {
    this.store.clearAll();
  }

  has(key: string): Promise<boolean> | boolean {
    return this.store.contains(key);
  }
}

export const storageKey = {
  user: {
    token: 'user.token',
    data: 'user.data',
    signupData: 'user.signupData',
  },
  vendor: {
    recentSearch: 'vendor.recentsearch',
  },
};

export const storage = new MMKV_STORAGE();

export const mixPanelStorage = new MMVK_MIXPANEL_STORAGE();
