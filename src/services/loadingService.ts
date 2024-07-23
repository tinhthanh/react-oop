import { Injectable } from "../utils/inject";

@Injectable
export class LoadingService {
    /** Show loading */
    public show(): boolean {
        const loadingEl = document.getElementById('loading-panel');
        if (loadingEl) {
            loadingEl.classList.remove('d-none');
            loadingEl.classList.add('d-flex');
            return true;
        }
        else {
            return false;
        }
    }

    /** Hide loading */
    public hide(): boolean {
        const loadingEl = document.getElementById('loading-panel');
        if (loadingEl) {
            loadingEl.classList.remove('d-flex');
            loadingEl.classList.add('d-none');
            return true;
        }
        else {
            return false;
        }
    }
}