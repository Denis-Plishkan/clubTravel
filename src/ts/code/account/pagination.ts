export class Pagination{
  private currentPage: number
  usersLength: number
  constructor(num: number){
      this.currentPage = 1;
      this.usersLength = num
      this.init()
  }

  init(){
      this.pagination("account-button-prev", "account-button-next", "current-page", "all-pages");
      this.pagination("account-button-prev-mob", "account-button-next-mob","current-page-mob", "all-pages-mob");
  }

  pagination(btnPrevId: string, btnNextId: string, thisPageId: string, allPagesId: string){
    const context = this
    const btnPrev = document.getElementById(btnPrevId);
    const btnNext = document.getElementById(btnNextId);
    const thisPage = document.getElementById(thisPageId);
    const allPages = document.getElementById(allPagesId);

    const calculate = Math.ceil(this.usersLength / 9)
    const quantityPages = calculate != 0 ? calculate: 1

    if(allPages){
      allPages.textContent = String(quantityPages)
    }

    btnPrev?.addEventListener("click", () => {
      minus()
    })

    btnNext?.addEventListener("click", () => {
      plus()
    })

    function minus(){
      if(context.currentPage > 1){
        context.currentPage--
        switchPage();
        hideOrder();
      }
    }

    function plus(){
      if(context.currentPage < quantityPages){
        context.currentPage++
        switchPage();
        hideOrder();
      }
    }

    function hideOrder(){
      const current = context.currentPage
      const allOrders = document.querySelectorAll(".order")
      const allOrdersMob = document.querySelectorAll(".account-mobile__table-wrapper")

      const visibleEnd = (context.currentPage * 9) - 1
      const visibleStart = visibleEnd  - 8

      allOrdersMob.forEach(item => {
        if(+item.id >= visibleStart && +item.id <= visibleEnd){
          item.classList.add("account-mobile__table-wrapper_active")
        }else{
          item.classList.remove("account-mobile__table-wrapper_active")
        }
      })

      allOrders.forEach(item => {
        if(+item.id >= visibleStart && +item.id <= visibleEnd){
          item.classList.add("order_active")
        }else{
          item.classList.remove("order_active")
        }
      })

      if(current === 1){
        btnPrev?.classList.remove("account__table-bottom-button_active")
      }else{
        btnPrev?.classList.add("account__table-bottom-button_active")
      }

      if(current === quantityPages){
        btnNext?.classList.remove("account__table-bottom-button_active")
      }else{
        btnNext?.classList.add("account__table-bottom-button_active")
      }
    }

    function switchPage(){
      if(thisPage){
        thisPage.innerHTML = String(context.currentPage)
      }
    }

    hideOrder();
  }
}