/**
 * @class Filter
 */
export class Filter {

    /**
     * Filters out everything not matching the input.
     *
     * @method filterAll
     * @returns void
     */
    filterAll() {
        // Declare variables
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById('allCounties');
        filter = input.value.toUpperCase();
        ul = document.getElementById("allCountiesList");
        li = ul.getElementsByTagName("li");

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }

    }

    /**
     * Filters out the counties not matching your input (among your chosen counties)
     *
     * @method filterMine
     * @returns void
     */
    filterMine() {
        // Declare variables
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById('myCounties');
        filter = input.value.toUpperCase();
        ul = document.getElementById("myCountiesList");
        li = ul.getElementsByTagName("li");

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    /**
     * Filters out everything in a table not matching the input
     *
     * @method filterTable()
     * @returns void
     */
    filterTable(){
        // Declare variables
        var input, filter, Table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        Table = document.getElementById("myTable");
        tr = Table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    /**
     * Unfilter a filtered table
     *
     * @method showAll
     * @returns void
     */
    showAll() {
        // Declare variables
        var input, filter, Table, tr, td, i, txtValue;
        input = "";
        filter = input.toUpperCase();
        Table = document.getElementById("myTable");
        tr = Table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    /**
     * filter out issues that does not have the status Registered.
     * ("td")[2] means that it's the third column from the left
     *
     * @method filterRegistered
     * @returns void
     */
    filterRegistered() {
        // Declare variables
        var input, filter, Table, tr, td, i, txtValue;
        input = "Registrert";
        filter = input.toUpperCase();
        Table = document.getElementById("myTable");
        tr = Table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    /**
     * filter out issues that does not have the status In progress.
     * ("td")[2] means that it's the third column from the left
     *
     * @method filterInProgress
     * @returns void
     */
    filterInProgress() {
        // Declare variables
        var input, filter, Table, tr, td, i, txtValue;
        input = "Behandles";
        filter = input.toUpperCase();
        Table = document.getElementById("myTable");
        tr = Table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    /**
     * filter out issues that does not have the status Completed.
     * ("td")[2] means that it's the third column from the left
     *
     * @method filterCompleted
     * @returns void
     */
    filterCompleted() {
        // Declare variables
        var input, filter, Table, tr, td, i, txtValue;
        input = "Fullført";
        filter = input.toUpperCase();
        Table = document.getElementById("myTable");
        tr = Table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}