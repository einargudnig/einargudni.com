export type UsesEntry = { name: string; href?: string; description?: string };

export type UsesFolder = {
  slug: string;
  entries: UsesEntry[];
  readme?: string[];
};

export const usesFolders: UsesFolder[] = [
  {
    slug: "personal-software",
    entries: [
      {
        name: "life-os",
        href: "https://github.com/einargudnig/life-os",
        description: "Syncs Whoop, Strava, calendar and tasks into one store agents can query",
      },
      {
        name: "jstop",
        href: "https://github.com/einargudnig/jstop",
        description: "Menu bar monitor for Node.js processes",
      },
      {
        name: "les",
        href: "https://github.com/einargudnig/les",
        description: "macOS RSS and read-it-later reader",
      },
      {
        name: "pdl",
        href: "https://pdl.einargudni.workers.dev",
        description: "Our weekly padel matches, standings and streaks",
      },
    ],
    readme: ["Tools I built for my own use."],
  },
  {
    slug: "desk",
    entries: [
      {
        name: "setup.png",
        href: "/images/desk.png",
        description: "Point and shoot photo of the current setup",
      },
      { name: 'Xiaomi Curved 34" screen', description: "Ultrawide monitor" },
      {
        name: "Ikea Bekant",
        href: "https://www.ikea.com/us/en/cat/bekant-system-18702/",
        description: "Standing desk",
      },
      {
        name: "Ikea Styrspel",
        href: "https://www.ikea.com/us/en/p/styrspel-gaming-chair-dark-gray-gray-20508089/",
        description: "Chair",
      },
      {
        name: "Apple Magic Trackpad",
        href: "https://www.apple.com/shop/product/MK2C3LL/A/magic-trackpad-black-multi-touch-surface",
      },
      { name: "Xiaomi desk lamp" },
      {
        name: "Yeelight LED strip",
        href: "https://www.yeelight.com",
        description: "Ambient lighting",
      },
      { name: "Xiaomi wireless charging pad" },
      {
        name: "Anker Prime USB hub",
        href: "https://www.anker.com/products/anker-prime",
        description: "The heart of the setup",
      },
      {
        name: "Obsbot Meet 2",
        href: "https://www.obsbot.com/obsbot-meet-2",
        description: "Webcam",
      },
      { name: "Vertical laptop stand", description: "No name, from Amazon" },
      { name: "Logitech speakers" },
      {
        name: "Seagate 4TB hard drive",
        href: "https://www.seagate.com",
        description: "External storage",
      },
    ],
    readme: [
      "This is most of the stuff that I have always on my desk. I'm pretty happy with the setup.",
      'I like to use only one screen and the 34" curved one has been working well!',
      "The Anker Prime USB hub is the heart of it — it powers my laptop, provides sound to the speakers, connects to the webcam, and I use it to charge my stuff.",
    ],
  },
  {
    slug: "devices",
    entries: [
      { name: 'MacBook Pro 16" M1 Max', description: "2021" },
      { name: "iPhone 14 Pro", href: "https://www.apple.com/iphone/" },
      { name: "AirPods Pro 1", href: "https://www.apple.com/airpods-pro/" },
      { name: "Whoop 4.0", href: "https://www.whoop.com", description: "Fitness tracker" },
      {
        name: "Sony WH-1000XM4",
        href: "https://www.sony.com/en/headphones/headband/wh-1000xm4",
        description: "Noise-cancelling headphones",
      },
      { name: "Garmin Venu 1", href: "https://www.garmin.com", description: "GPS smartwatch" },
      { name: "Asus Zenbook 3", description: "Secondary laptop" },
      { name: "Raspberry Pi 2", href: "https://www.raspberrypi.com", description: "Home server" },
      {
        name: "Adidas Boston 13",
        href: "https://www.adidas.com/us/adizero-boston-13",
        description: "Running shoes",
      },
    ],
  },
  {
    slug: "keyboard",
    entries: [
      {
        name: "Keychron Q8 Pro",
        href: "https://www.keychron.com/products/keychron-q8-pro-qmk-via-wireless-custom-mechanical-keyboard",
        description: "Alice layout, wireless",
      },
      {
        name: "NuPhy Halo75",
        href: "https://nuphy.com/collections/halo75",
        description: "75% wireless",
      },
    ],
  },
  {
    slug: "command-line",
    entries: [
      { name: "Tmux", href: "https://github.com/tmux/tmux", description: "Terminal multiplexer" },
      { name: "Neovim", href: "https://neovim.io", description: "Hyperextensible text editor" },
      {
        name: "Lazygit",
        href: "https://github.com/jesseduffield/lazygit",
        description: "Terminal UI for git",
      },
      { name: "fzf", href: "https://github.com/junegunn/fzf", description: "Fuzzy finder" },
      {
        name: "eza",
        href: "https://github.com/eza-community/eza",
        description: "Modern ls replacement",
      },
      { name: "zoxide", href: "https://github.com/ajeetdsouza/zoxide", description: "Smarter cd" },
      {
        name: "yazi",
        href: "https://github.com/sxyazi/yazi",
        description: "Terminal file manager",
      },
      { name: "atuin", href: "https://atuin.sh", description: "Shell history sync" },
      { name: "homebrew", href: "https://brew.sh", description: "Package manager for macOS" },
      {
        name: "bat",
        href: "https://github.com/sharkdp/bat",
        description: "cat with syntax highlighting",
      },
      {
        name: "ripgrep",
        href: "https://github.com/BurntSushi/ripgrep",
        description: "Fast search tool",
      },
      { name: "fd", href: "https://github.com/sharkdp/fd", description: "Fast find alternative" },
      {
        name: "btop",
        href: "https://github.com/aristocratos/btop",
        description: "Resource monitor",
      },
      { name: "jq", href: "https://jqlang.github.io/jq/", description: "JSON processor" },
    ],
  },
  {
    slug: "infrastructure",
    entries: [
      { name: "Ghostty", href: "https://ghostty.org", description: "GPU-accelerated terminal" },
      {
        name: "WezTerm",
        href: "https://wezfurlong.org/wezterm/",
        description: "Terminal emulator",
      },
      { name: "Zsh", href: "https://www.zsh.org", description: "Shell" },
      {
        name: "Raycast",
        href: "https://raycast.com",
        description: "Launcher and productivity tool",
      },
      { name: "Obsidian", href: "https://obsidian.md", description: "Knowledge base and notes" },
      { name: "Things 3", href: "https://culturedcode.com/things/", description: "Task manager" },
      { name: "Spark", href: "https://sparkmailapp.com", description: "Email client" },
      { name: "Arc", href: "https://arc.net", description: "Browser" },
      {
        name: "Notion Calendar",
        href: "https://www.notion.so/product/calendar",
        description: "Calendar",
      },
      { name: "Cursor", href: "https://cursor.com", description: "AI code editor" },
      { name: "Bruno", href: "https://www.usebruno.com", description: "API client" },
      { name: "Insomnia", href: "https://insomnia.rest", description: "API client" },
      { name: "1Password", href: "https://1password.com", description: "Password manager" },
      { name: "CleanShot X", href: "https://cleanshot.com", description: "Screenshot tool" },
      {
        name: "Rectangle Pro",
        href: "https://rectangleapp.com/pro",
        description: "Window management",
      },
      {
        name: "Homerow",
        href: "https://www.homerow.app",
        description: "Keyboard navigation for macOS",
      },
      {
        name: "Vimium",
        href: "https://vimium.github.io",
        description: "Vim keybindings for the browser",
      },
      {
        name: "Karabiner-Elements",
        href: "https://karabiner-elements.pqrs.org",
        description: "Keyboard customizer",
      },
      { name: "Cold Turkey", href: "https://getcoldturkey.com", description: "Website blocker" },
      { name: "Toggl", href: "https://toggl.com", description: "Time tracking" },
    ],
  },
];
