<template>
  <ul class="lList">
    <slot>
      <li>
        LList
      </li>
    </slot>
  </ul>
</template>

<script>
export default {
  name: "LList"
};
</script>

<style lang="scss" scoped>
.lList {
  list-style: none;
  margin: 15px 0;
  padding: 0;
  width: 100%;
  background: $listBgColor;
  border: $listBorder;

  > li {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: $listItemBorderBottom;
    color: $listItemFontColor;
    overflow-x: auto;

    > * {
      padding: 15px 0;
    }

    &:only-child {
      border-bottom: 0px;
    }

    > .subTitle {
      margin: 0 16px;
      width: 100%;
      min-width: 50px;
    }

    > .title {
      min-width: 50px;
      width: 100%;
      text-decoration: none;
      color: inherit;
      padding: 15px 0;
      margin: 0 15px;
      white-space: nowrap;
      overflow-x: auto;
      cursor: pointer;
    }

    > .badge {
      background: darken($listItemBgColor, $amount: 5);
      border: 1px solid darken($listItemBgColor, $amount: 10);
      color: $listItemFontColor;
      font-size: 0.9rem;
      padding: 2px 10px;
      border-radius: 5px;
      text-align: center;
      margin-right: 15px;
    }

    &:hover,
    &:active {
      background: darken($listItemBgColor, $amount: 3);
      color: $listItemFontColor;
    }
  }
}
</style>
