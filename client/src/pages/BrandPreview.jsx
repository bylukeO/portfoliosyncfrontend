/**
 * Brand Preview Page
 * 
 * A comprehensive showcase of the PortfolioSync brand design system.
 * This page can be used as a reference and to verify brand consistency.
 */

import { Button, Card, Input, Badge, Select, Skeleton } from '../components/ui';

export default function BrandPreview() {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-white mb-2">
                    PortfolioSync Brand Preview
                </h1>
                <p className="text-lg text-slate-400">
                    A comprehensive showcase of the design system
                </p>
            </div>

            {/* Colors Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold text-white mb-6">Color Palette</h2>

                {/* Primary Colors */}
                <div className="mb-8">
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">
                        Primary - Cyan Accent
                    </h3>
                    <div className="flex gap-4">
                        <ColorSwatch color="#22D3EE" name="Cyan Light" />
                        <ColorSwatch color="#06B6D4" name="Cyan Accent" isMain />
                        <ColorSwatch color="#0891B2" name="Cyan Dark" />
                    </div>
                </div>

                {/* Background Colors */}
                <div className="mb-8">
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">
                        Backgrounds
                    </h3>
                    <div className="flex gap-4">
                        <ColorSwatch color="#0F172A" name="Base" />
                        <ColorSwatch color="#1E293B" name="Elevated" />
                        <ColorSwatch color="#334155" name="Subtle" />
                    </div>
                </div>

                {/* Text Colors */}
                <div className="mb-8">
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">
                        Text Colors
                    </h3>
                    <div className="flex gap-4">
                        <ColorSwatch color="#F8FAFC" name="Primary" />
                        <ColorSwatch color="#94A3B8" name="Secondary" />
                        <ColorSwatch color="#64748B" name="Muted" />
                        <ColorSwatch color="#475569" name="Disabled" />
                    </div>
                </div>

                {/* Semantic Colors */}
                <div>
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">
                        Semantic Colors
                    </h3>
                    <div className="flex gap-4">
                        <ColorSwatch color="#22C55E" name="Success" />
                        <ColorSwatch color="#EAB308" name="Warning" />
                        <ColorSwatch color="#EF4444" name="Error" />
                        <ColorSwatch color="#3B82F6" name="Info" />
                    </div>
                </div>
            </section>

            {/* Typography Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold text-white mb-6">Typography</h2>
                <Card>
                    <div className="space-y-6">
                        <div>
                            <span className="text-xs text-slate-500 font-medium">Display - 48px / Bold</span>
                            <p className="text-5xl font-bold text-white tracking-tight">Display Heading</p>
                        </div>
                        <div>
                            <span className="text-xs text-slate-500 font-medium">H1 - 36px / Bold</span>
                            <h1 className="text-4xl font-bold text-white">Heading One</h1>
                        </div>
                        <div>
                            <span className="text-xs text-slate-500 font-medium">H2 - 24px / Semibold</span>
                            <h2 className="text-2xl font-semibold text-white">Heading Two</h2>
                        </div>
                        <div>
                            <span className="text-xs text-slate-500 font-medium">H3 - 20px / Semibold</span>
                            <h3 className="text-xl font-semibold text-white">Heading Three</h3>
                        </div>
                        <div>
                            <span className="text-xs text-slate-500 font-medium">Body - 16px / Regular</span>
                            <p className="text-base text-slate-300">
                                This is body text. PortfolioSync helps you keep your portfolio in perfect sync
                                with your GitHub repositories.
                            </p>
                        </div>
                        <div>
                            <span className="text-xs text-slate-500 font-medium">Caption - 12px / Medium</span>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Section Label
                            </p>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Buttons Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold text-white mb-6">Buttons</h2>
                <Card>
                    <div className="space-y-8">
                        {/* Variants */}
                        <div>
                            <h4 className="text-sm font-medium text-slate-400 mb-4">Variants</h4>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="primary">Primary</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="danger">Danger</Button>
                                <Button variant="success">Success</Button>
                            </div>
                        </div>

                        {/* Sizes */}
                        <div>
                            <h4 className="text-sm font-medium text-slate-400 mb-4">Sizes</h4>
                            <div className="flex items-center gap-4">
                                <Button size="sm">Small</Button>
                                <Button size="md">Medium</Button>
                                <Button size="lg">Large</Button>
                            </div>
                        </div>

                        {/* States */}
                        <div>
                            <h4 className="text-sm font-medium text-slate-400 mb-4">States</h4>
                            <div className="flex gap-4">
                                <Button>Normal</Button>
                                <Button loading>Loading</Button>
                                <Button disabled>Disabled</Button>
                            </div>
                        </div>

                        {/* With Icons */}
                        <div>
                            <h4 className="text-sm font-medium text-slate-400 mb-4">With Icons</h4>
                            <div className="flex gap-4">
                                <Button
                                    icon={
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                    }
                                >
                                    Add New
                                </Button>
                                <Button
                                    variant="secondary"
                                    icon={
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                    }
                                >
                                    Upload
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Badges Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold text-white mb-6">Badges</h2>
                <Card>
                    <div className="space-y-6">
                        {/* Variants */}
                        <div>
                            <h4 className="text-sm font-medium text-slate-400 mb-4">Variants</h4>
                            <div className="flex flex-wrap gap-3">
                                <Badge variant="success">Success</Badge>
                                <Badge variant="warning">Warning</Badge>
                                <Badge variant="error">Error</Badge>
                                <Badge variant="info">Info</Badge>
                                <Badge variant="neutral">Neutral</Badge>
                                <Badge variant="cyan">Cyan</Badge>
                            </div>
                        </div>

                        {/* With Dots */}
                        <div>
                            <h4 className="text-sm font-medium text-slate-400 mb-4">With Status Dots</h4>
                            <div className="flex flex-wrap gap-3">
                                <Badge variant="success" dot>Online</Badge>
                                <Badge variant="warning" dot>Pending</Badge>
                                <Badge variant="error" dot>Offline</Badge>
                                <Badge variant="info" dot>Processing</Badge>
                            </div>
                        </div>

                        {/* Sizes */}
                        <div>
                            <h4 className="text-sm font-medium text-slate-400 mb-4">Sizes</h4>
                            <div className="flex items-center gap-3">
                                <Badge size="sm" variant="cyan">Small</Badge>
                                <Badge size="md" variant="cyan">Medium</Badge>
                                <Badge size="lg" variant="cyan">Large</Badge>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Inputs Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold text-white mb-6">Form Inputs</h2>
                <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Username"
                            placeholder="Enter your username"
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            hint="We'll never share your email."
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            error="Password must be at least 8 characters"
                        />
                        <Input
                            label="Search"
                            placeholder="Search..."
                            icon={
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            }
                        />
                        <Select
                            label="Select Option"
                            options={[
                                { value: 'option1', label: 'Option 1' },
                                { value: 'option2', label: 'Option 2' },
                                { value: 'option3', label: 'Option 3' },
                            ]}
                        />
                        <Select
                            label="With Error"
                            options={[
                                { value: 'a', label: 'Choice A' },
                                { value: 'b', label: 'Choice B' },
                            ]}
                            error="Please select an option"
                        />
                    </div>
                </Card>
            </section>

            {/* Cards Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold text-white mb-6">Cards</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <Card.Header>
                            <Card.Title>Default Card</Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <Card.Description>
                                This is a standard card with just content inside.
                            </Card.Description>
                        </Card.Content>
                    </Card>

                    <Card variant="elevated">
                        <Card.Header>
                            <Card.Title>Elevated Card</Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <Card.Description>
                                This card has a more elevated background.
                            </Card.Description>
                        </Card.Content>
                    </Card>

                    <Card variant="accent" glow>
                        <Card.Header>
                            <Card.Title>Accent Card</Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <Card.Description>
                                Featured card with cyan accent border and glow.
                            </Card.Description>
                        </Card.Content>
                    </Card>

                    <Card interactive onClick={() => alert('Clicked!')}>
                        <Card.Header>
                            <Card.Title>Interactive Card</Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <Card.Description>
                                Click me! I have hover and focus states.
                            </Card.Description>
                        </Card.Content>
                    </Card>

                    <Card className="md:col-span-2">
                        <Card.Header>
                            <div>
                                <Card.Title>Card with Footer</Card.Title>
                                <Card.Description>This card has action buttons</Card.Description>
                            </div>
                            <Badge variant="success" dot>Active</Badge>
                        </Card.Header>
                        <Card.Content>
                            <p className="text-slate-300">
                                Cards can contain complex layouts with headers, content, and footers.
                            </p>
                        </Card.Content>
                        <Card.Footer>
                            <Button variant="ghost" size="sm">Cancel</Button>
                            <Button size="sm">Save Changes</Button>
                        </Card.Footer>
                    </Card>
                </div>
            </section>

            {/* Loading States */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold text-white mb-6">Loading States</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <h4 className="text-sm font-medium text-slate-400 mb-4">Skeleton Shapes</h4>
                        <div className="space-y-4">
                            <Skeleton width="100%" height={16} />
                            <Skeleton width="75%" height={16} />
                            <Skeleton width="50%" height={16} />
                            <div className="flex items-center gap-4 mt-6">
                                <Skeleton variant="circle" size={48} />
                                <Skeleton variant="text" lines={2} />
                            </div>
                        </div>
                    </Card>

                    <div>
                        <h4 className="text-sm font-medium text-slate-400 mb-4">Card Skeleton</h4>
                        <Skeleton.Card />
                    </div>
                </div>
            </section>

            {/* Diff Styles */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold text-white mb-6">Diff Highlighting</h2>
                <Card padding="none">
                    <div className="divide-y divide-slate-800">
                        <div className="diff-add px-4 py-2">
                            <code className="text-sm text-green-400">+ Added line of code</code>
                        </div>
                        <div className="diff-remove px-4 py-2">
                            <code className="text-sm text-red-400">- Removed line of code</code>
                        </div>
                        <div className="diff-modify px-4 py-2">
                            <code className="text-sm text-yellow-400">~ Modified line of code</code>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Spacing & Border Radius */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold text-white mb-6">Spacing & Border Radius</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <h4 className="text-sm font-medium text-slate-400 mb-4">Border Radius</h4>
                        <div className="flex gap-4 items-end">
                            <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/50 rounded-sm flex items-center justify-center text-xs text-slate-400">sm</div>
                            <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/50 rounded-md flex items-center justify-center text-xs text-slate-400">md</div>
                            <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/50 rounded-lg flex items-center justify-center text-xs text-slate-400">lg</div>
                            <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/50 rounded-xl flex items-center justify-center text-xs text-slate-400">xl</div>
                            <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/50 rounded-full flex items-center justify-center text-xs text-slate-400">full</div>
                        </div>
                    </Card>

                    <Card>
                        <h4 className="text-sm font-medium text-slate-400 mb-4">Shadows</h4>
                        <div className="flex gap-6">
                            <div className="w-20 h-20 bg-slate-800 rounded-lg shadow-sm flex items-center justify-center text-xs text-slate-400">sm</div>
                            <div className="w-20 h-20 bg-slate-800 rounded-lg shadow-md flex items-center justify-center text-xs text-slate-400">md</div>
                            <div className="w-20 h-20 bg-slate-800 rounded-lg shadow-lg flex items-center justify-center text-xs text-slate-400">lg</div>
                            <div className="w-20 h-20 bg-slate-800 rounded-lg shadow-lg shadow-cyan-500/20 flex items-center justify-center text-xs text-slate-400">glow</div>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
}

// Color Swatch Component
function ColorSwatch({ color, name, isMain = false }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className={`w-16 h-16 rounded-lg border border-white/10 ${isMain ? 'ring-2 ring-white/20' : ''}`}
                style={{ backgroundColor: color }}
            />
            <div className="text-center">
                <p className="text-xs font-medium text-slate-300">{name}</p>
                <p className="text-xs text-slate-500 font-mono">{color}</p>
            </div>
        </div>
    );
}
