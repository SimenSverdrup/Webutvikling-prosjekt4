import { observable, action, computed, reaction } from 'mobx';
import React from "react";
import { createContext } from "react";

export interface IFilter {
    filter_field: ["year", "imdbRating"];
    filter_equal_to: boolean,
    filter_greater_than: boolean,
    filter_less_than: boolean
}

class Store {
    // Observable state handlers
    @observable select_id = "5f897e75987fae2bf4a18131";

    @observable search_string = "";

    @observable genre = "*";

    @observable sort = "*";

    @observable page = 0;

    @observable modalVisible = false;


    // Actions:
    @action updateSearch = (search: string) => {
        this.search_string = search;
        console.log("Search updated to: " + this.search_string);
        this.updatePage(0);
    }

    @action updateSelect = (selection: string) => {
        this.select_id = selection;
        console.log("Selection updated to: " + this.select_id);
        this.updateModalVisible(true);
    }

    @action updateGenre = (genre: string) => {
        this.genre = genre;
        console.log("Genre filter updated to: " + this.genre);
    }

    @action updateSort = (sort: string) => {
        this.sort = sort;
        console.log("Sort updated to: " + this.sort);
    }

    @action updatePage = (page: number) => {
        this.page = page;
        console.log("Sort updated to: " + this.page.toString());
    }

    @action updateModalVisible = (modalVisible: boolean) => {
        this.modalVisible = modalVisible;
        console.log("Modal updated to: " + modalVisible.toString());
    }
}


export default createContext(new Store())