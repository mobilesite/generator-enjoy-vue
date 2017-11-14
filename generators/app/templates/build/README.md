# 生成后的vue-loader的options.json示例

这可以更好地帮助你理解webpack的配置文件中生成相应loader配置的相关逻辑。

```json
{
  "loaders": {
    "css": [
      "vue-style-loader",
      {
        "loader": "css-loader",
        "options": {
          "minimize": false,
          "sourceMap": false
        }
      }
    ],
    "postcss": [
      "vue-style-loader",
      {
        "loader": "css-loader",
        "options": {
          "minimize": false,
          "sourceMap": false
        }
      }
    ],
    "less": [
      "vue-style-loader",
      {
        "loader": "css-loader",
        "options": {
          "minimize": false,
          "sourceMap": false
        }
      },
      {
        "loader": "less-loader",
        "options": {
          "sourceMap": false
        }
      }
    ],
    "sass": [
      "vue-style-loader",
      {
        "loader": "css-loader",
        "options": {
          "minimize": false,
          "sourceMap": false
        }
      },
      {
        "loader": "sass-loader",
        "options": {
          "indentedSyntax": true,
          "sourceMap": false
        }
      }
    ],
    "scss": [
      "vue-style-loader",
      {
        "loader": "css-loader",
        "options": {
          "minimize": false,
          "sourceMap": false
        }
      },
      {
        "loader": "sass-loader",
        "options": {
          "sourceMap": false
        }
      }
    ],
    "stylus": [
      "vue-style-loader",
      {
        "loader": "css-loader",
        "options": {
          "minimize": false,
          "sourceMap": false
        }
      },
      {
        "loader": "stylus-loader",
        "options": {
          "sourceMap": false
        }
      }
    ],
    "styl": [
      "vue-style-loader",
      {
        "loader": "css-loader",
        "options": {
          "minimize": false,
          "sourceMap": false
        }
      },
      {
        "loader": "stylus-loader",
        "options": {
          "sourceMap": false
        }
      }
    ]
  }
}
```