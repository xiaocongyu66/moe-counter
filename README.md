# moe-counter

基于 [Cloudflare Workers](https://workers.cloudflare.com/) 的 [Moe-Counter](https://github.com/journey-ad/Moe-Counter) 萌萌计数器的分叉。

![Moe Counter](https://moe.cy96.ggff.net/github@moe-counter-cf)

<details>
<summary>More theme</summary>

**asoul**

![asoul](https://moe-counter.lxchapu.com/demo?theme=asoul)

**moebooru**

![moebooru](https://moe-counter.lxchapu.com/demo?theme=moebooru)

**rule34**

![rule34](https://moe-counter.lxchapu.com/demo?theme=rule34)

**booru-jaypee**

![booru-jaypee](https://moe.cy96.ggff.net/demo?theme=booru-jaypee)

**booru-smtg**

![booru-smtg](https://moe.cy96.ggff.net/demo?theme=booru-smtg)


**gelbooru**

![gelbooru](https://moe-counter.lxchapu.com/demo?theme=gelbooru)

</details>

## Demo

<https://moe.cy96.ggff.net/>

## Usage

**一键部署**

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/xiaocongyu66/moe-counter-D1)

- 点击按钮无需配置，直接部署，部署后，按照下列步骤

- 打开D1 SQL 控制台 分别执行以下两行指令
```SQL
DROP TABLE IF EXISTS view

CREATE TABLE IF NOT EXISTS view (id TEXT PRIMARY KEY, num INTEGER)
```


- 在你的储存库 `wrangler.toml` 中修改成自己的域名
- (cloudfare会自动创建储存库名字是一样的)


  ```toml
  [[routes]]
  pattern = "<your custom domain>"
  ```
- 这个是必需品 填写为你的域名或者子域名 cloudfare会自动添加dns记录 然后就能部署成功

**自己部署**

- 分叉这个仓库
- 在 [Cloudflare D1](https://developers.cloudflare.com/d1/) 创建一个数据库(一键部署可以不用这么干)
- 下面的基本不用干了 都自动弄好了 除了下面的域名 这个是必需品 填写为你的域名或者子域名 cloudfare会自动添加dns记录 然后就能部署成功
- (cloudfare会自动创建储存库名字是一样的)
- 返回github在自己的储存库中 `wrangler.toml` 中修改对应的数据库名称和数据库 ID

  ```toml
  database_name = "<your database name>"
  database_id = "<your database id>"
  ```

- 在 `wrangler.toml` 中修改成自己的域名

  ```toml
  [[routes]]
  pattern = "<your custom domain>"
  ```

- 使用 `npm run deploy` 编译并发布 worker

如果想在本地运行，需要先初始化本地数据库。

```sh
npm run initdb
```

## Configuration

`config.yml`

```yml
length: 7

theme: 'moebooru'
```

## Credits

- [A-SOUL](https://space.bilibili.com/703007996)
- [Moebooru](https://github.com/moebooru/moebooru)
- [Rule 34](https://rule34.xxx/) **❗NSFW❗**
- [Gelbooru](https://gelbooru.com/) **❗NSFW❗**

## License

MIT &copy; 柃夏chapu

<https://github.com/lxchapu/moe-counter>
