import {inject} from "aurelia-framework";
export class SourceManager {
    constructor(page) {
        this.itemPerPage = page;
        this.dataSource;
        this.displaySource;
        this.currentRecord;
        this.sourceCache;
        this.currentPage;
        this.searchCriteria;
        this.totalPage;
    }
    selectedRecord(item) {
        this.currentRecord = item;
    }
    pageCount() {
        this.totalPage = Math.ceil(this.dataSource.length / this.itemPerPage) || 1;
        return this.totalPage;
    }
    nextPage() {
        if (this.currentPage < (this.pageCount() - 1)) {
            this.currentPage = this.currentPage + 1;
            this.showpage();
        }
    }
    previeusPage() {
        if (this.currentPage > 0) {
            this.currentPage = this.currentPage - 1;
            this.showpage();
        }
    }
    firstPage() {
        this.currentPage = 0;
        this.showpage();
    };
    lastPage() {
        this.currentPage = this.pageCount() - 1;
        this.showpage();
    };
    goToPage(page) {
        this.currentPage = page;
        this.showpage();
        this.pageCount();
    };
    pageSearch(items) {
        this.currentPage = 0;
        this.dataSource = items;
        this.showpage();
        this.pageCount();
    };
    pageInit(items) {
        this.currentPage = 0;
        this.dataSource = items;
        this.sourceCache = items;
        this.showpage();
        this.pageCount();
    };
    deleteItem(deleteIndex) {
        this.sourceCache.splice(deleteIndex, 1);
        this.pageInit(this.sourceCache);
        this.firstPage();
    }
    showpage() {
        var size = this.itemPerPage;
        var start = this.currentPage * size;
        this.displaySource = this.dataSource.slice(start, start + size);
        if (this.displaySource.length) {
            this.currentRecord = this.displaySource[0];
            this.selectedRecord(this.currentRecord);
            this.pageCount();
        }

        return this.displaySource;
    };
}




