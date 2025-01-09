import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Settings2, Key, Search, FileText, Brain, Globe } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState({
    allowPaidApis: false,
    language: 'english',
    llmTemperature: 0.55,
    maxIterations: 4,
    maxSearchResults: 5,
    maxSubtopics: 3,
    memoryBackend: 'local',
    reportFormat: 'APA',
    reportSource: 'web',
    retriever: 'tavily',
    scraper: 'bs',
    similarityThreshold: 0.42,
    totalWords: 1000,
  });

  const handleConfigChange = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">GPT Researcher Configuration</CardTitle>
            <CardDescription>
              Customize your research assistant's behavior and capabilities
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid grid-cols-5 gap-4 bg-muted p-1">
            <TabsTrigger value="general" className="space-x-2">
              <Settings2 className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="space-x-2">
              <Key className="h-4 w-4" />
              <span>API Keys</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="space-x-2">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </TabsTrigger>
            <TabsTrigger value="report" className="space-x-2">
              <FileText className="h-4 w-4" />
              <span>Report</span>
            </TabsTrigger>
            <TabsTrigger value="models" className="space-x-2">
              <Brain className="h-4 w-4" />
              <span>Models</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic configuration for the research assistant</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">Allow Paid APIs</h4>
                    <p className="text-sm text-muted-foreground">Enable usage of paid API services</p>
                  </div>
                  <Switch
                    checked={config.allowPaidApis}
                    onCheckedChange={(checked) => handleConfigChange('allowPaidApis', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Language</h4>
                  <Select
                    value={config.language}
                    onValueChange={(value) => handleConfigChange('language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="italian">Italian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Memory Backend</h4>
                  <Select
                    value={config.memoryBackend}
                    onValueChange={(value) => handleConfigChange('memoryBackend', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select memory backend" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="redis">Redis</SelectItem>
                      <SelectItem value="pinecone">Pinecone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Search Settings</CardTitle>
                <CardDescription>Configure how research is conducted</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-medium">Search Engine</h4>
                  <Select
                    value={config.retriever}
                    onValueChange={(value) => handleConfigChange('retriever', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select search engine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tavily">Tavily</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="bing">Bing</SelectItem>
                      <SelectItem value="duckduckgo">DuckDuckGo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Max Search Results</h4>
                    <p className="text-sm text-muted-foreground">Number of results per search query</p>
                  </div>
                  <Slider
                    value={[config.maxSearchResults]}
                    onValueChange={([value]) => handleConfigChange('maxSearchResults', value)}
                    max={10}
                    min={1}
                    step={1}
                  />
                  <span className="text-sm">{config.maxSearchResults} results</span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Web Scraper</h4>
                  <Select
                    value={config.scraper}
                    onValueChange={(value) => handleConfigChange('scraper', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select scraper" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bs">BeautifulSoup</SelectItem>
                      <SelectItem value="playwright">Playwright</SelectItem>
                      <SelectItem value="selenium">Selenium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="report" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Report Settings</CardTitle>
                <CardDescription>Configure how research reports are generated</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-medium">Citation Format</h4>
                  <Select
                    value={config.reportFormat}
                    onValueChange={(value) => handleConfigChange('reportFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="APA">APA</SelectItem>
                      <SelectItem value="MLA">MLA</SelectItem>
                      <SelectItem value="Chicago">Chicago</SelectItem>
                      <SelectItem value="Harvard">Harvard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Source Type</h4>
                  <Select
                    value={config.reportSource}
                    onValueChange={(value) => handleConfigChange('reportSource', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web</SelectItem>
                      <SelectItem value="docs">Documents</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Target Word Count</h4>
                    <p className="text-sm text-muted-foreground">Approximate length of generated reports</p>
                  </div>
                  <Slider
                    value={[config.totalWords]}
                    onValueChange={([value]) => handleConfigChange('totalWords', value)}
                    max={2000}
                    min={500}
                    step={100}
                  />
                  <span className="text-sm">{config.totalWords} words</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Model Settings</CardTitle>
                <CardDescription>Configure AI model behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Temperature</h4>
                    <p className="text-sm text-muted-foreground">Controls randomness in responses (0-1)</p>
                  </div>
                  <Slider
                    value={[config.llmTemperature]}
                    onValueChange={([value]) => handleConfigChange('llmTemperature', value)}
                    max={1}
                    min={0}
                    step={0.05}
                  />
                  <span className="text-sm">{config.llmTemperature}</span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Max Iterations</h4>
                    <p className="text-sm text-muted-foreground">Number of research cycles</p>
                  </div>
                  <Slider
                    value={[config.maxIterations]}
                    onValueChange={([value]) => handleConfigChange('maxIterations', value)}
                    max={10}
                    min={1}
                    step={1}
                  />
                  <span className="text-sm">{config.maxIterations} iterations</span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Similarity Threshold</h4>
                    <p className="text-sm text-muted-foreground">Minimum similarity for content matching (0-1)</p>
                  </div>
                  <Slider
                    value={[config.similarityThreshold]}
                    onValueChange={([value]) => handleConfigChange('similarityThreshold', value)}
                    max={1}
                    min={0}
                    step={0.01}
                  />
                  <span className="text-sm">{config.similarityThreshold}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>Manage your API keys for various services</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <h4 className="font-medium">OpenAI API Key</h4>
                  <Input type="password" placeholder="sk-..." />
                </div>
                <div className="grid gap-2">
                  <h4 className="font-medium">Google API Key</h4>
                  <Input type="password" placeholder="AIza..." />
                </div>
                <div className="grid gap-2">
                  <h4 className="font-medium">Anthropic API Key</h4>
                  <Input type="password" placeholder="sk-ant-..." />
                </div>
                <Button className="w-full">Save API Keys</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardContent className="pt-6">
            <Button className="w-full" size="lg">
              Save Configuration
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}