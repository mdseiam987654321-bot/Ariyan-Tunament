
"use client";

import { useState } from 'react';
import { analyzePlayerPerformance } from '@/ai/flows/player-performance-strategy';
import { predictTournamentMatches } from '@/ai/flows/tournament-match-predictions-flow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BrainCircuit, Zap, Target, ShieldCheck, ChevronRight, Loader2, BarChart3, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AIStrategistPage() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [predictions, setPredictions] = useState<any>(null);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const result = await analyzePlayerPerformance({
        playerId: "ARIYAN_ELITE_99",
        pastMatches: [
          {
            matchId: "M1",
            tournamentName: "Elite Squad Cup",
            gameMode: "Squad",
            kills: 8,
            deaths: 2,
            assists: 4,
            matchRank: 1,
            damageDealt: 1200,
            damageTaken: 450,
            headshots: 5,
            survivalTimeSeconds: 1200
          },
          {
            matchId: "M2",
            tournamentName: "Solo Rush",
            gameMode: "Solo",
            kills: 3,
            deaths: 1,
            assists: 0,
            matchRank: 5,
            damageDealt: 600,
            damageTaken: 800,
            headshots: 1,
            survivalTimeSeconds: 900
          }
        ],
        recentAchievements: "3 win streak in Squad mode. Improved headshot accuracy by 15%."
      });
      setAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const runPredictions = async () => {
    setLoading(true);
    try {
      const result = await predictTournamentMatches({
        historicalTournamentData: JSON.stringify({
          lastSeason: { winner: "Team Alpha", runnerUp: "Team Delta" },
          averageMatchDuration: "15 mins"
        }),
        playerStatistics: JSON.stringify({
          topKD: 4.5,
          mostWins: "GamerPro"
        }),
        upcomingMatches: JSON.stringify([
          { matchId: "UP1", teamA: "Team Alpha", teamB: "Team Bravo", format: "Bo3" },
          { matchId: "UP2", teamA: "Team Charlie", teamB: "Team Delta", format: "Bo3" }
        ])
      });
      setPredictions(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-16 h-16 rounded-2xl gaming-gradient flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(230,36,50,0.4)]">
          <BrainCircuit className="w-10 h-10 text-white" />
        </div>
        <h1 className="font-headline text-3xl font-bold uppercase tracking-tighter">AI Match Strategist</h1>
        <p className="text-muted-foreground max-w-lg mt-2 text-sm">
          Neural-powered insights to analyze your gameplay and predict winning outcomes for upcoming tournaments.
        </p>
      </div>

      <Tabs defaultValue="strategy" className="w-full">
        <TabsList className="grid w-full grid-cols-2 glass-morphism p-1 h-12 rounded-xl mb-8">
          <TabsTrigger value="strategy" className="rounded-lg data-[state=active]:gaming-gradient data-[state=active]:text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            GAMEPLAY ANALYSIS
          </TabsTrigger>
          <TabsTrigger value="prediction" className="rounded-lg data-[state=active]:gaming-gradient data-[state=active]:text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            TOURNAMENT PREDICTOR
          </TabsTrigger>
        </TabsList>

        <TabsContent value="strategy">
          {!analysis ? (
            <Card className="border-primary/20 bg-primary/5 p-8 text-center flex flex-col items-center">
              <Zap className="w-12 h-12 text-primary mb-4 animate-bounce" />
              <h3 className="text-xl font-bold mb-2">Analyze Your Gameplay</h3>
              <p className="text-muted-foreground mb-6 max-w-sm text-sm">
                We'll scan your recent KD ratios and rotation patterns to build a custom evolution path.
              </p>
              <Button onClick={runAnalysis} disabled={loading} className="h-12 px-10 gaming-gradient font-bold">
                {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> SCANNING...</> : 'GENERATE PERFORMANCE STRATEGY'}
              </Button>
            </Card>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase">
                    <Target className="w-4 h-4" /> PERFORMANCE OVERVIEW
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed italic border-l-2 border-primary pl-4 py-2">
                    "{analysis.overallSummary}"
                  </p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-white/10 bg-white/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-primary">STRENGTHS</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {analysis.strengths.map((s: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <ShieldCheck className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-white/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-red-500">WEAKNESSES</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {analysis.weaknesses.map((w: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <Zap className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>{w}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-center text-muted-foreground">Actionable Intel</h4>
                {analysis.strategicTips.map((tip: string, i: number) => (
                  <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
                    <span className="text-sm font-medium">{tip}</span>
                    <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
              
              <Button onClick={() => setAnalysis(null)} variant="ghost" className="w-full text-muted-foreground text-xs uppercase">
                Reset Analysis
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="prediction">
          {!predictions ? (
            <Card className="border-accent/20 bg-accent/5 p-8 text-center flex flex-col items-center">
              <TrendingUp className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-2">Predict Match Outcomes</h3>
              <p className="text-muted-foreground mb-6 max-w-sm text-sm">
                Get high-confidence predictions for upcoming matches based on historical tournament data.
              </p>
              <Button onClick={runPredictions} disabled={loading} className="h-12 px-10 border-accent text-accent bg-accent/10 hover:bg-accent/20 font-bold border-2">
                {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> CALCULATING...</> : 'PREDICT WINNERS'}
              </Button>
            </Card>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {predictions.predictions.map((pred: any, i: number) => (
                <Card key={i} className="border-white/10 bg-white/5 overflow-hidden">
                  <CardHeader className="bg-white/5 p-4 flex flex-row justify-between items-center">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Match ID: {pred.matchId}</div>
                    <Badge className="bg-primary/20 text-primary border-primary/30">{pred.confidenceScore}% Confidence</Badge>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-center flex-1">
                        <div className="font-bold text-lg">{pred.teamA}</div>
                        <div className="text-[10px] text-muted-foreground">CHALLENGER</div>
                      </div>
                      <div className="px-4 font-headline italic text-primary font-bold">VS</div>
                      <div className="text-center flex-1">
                        <div className="font-bold text-lg">{pred.teamB}</div>
                        <div className="text-[10px] text-muted-foreground">CHALLENGER</div>
                      </div>
                    </div>
                    
                    <div className="bg-primary/10 rounded-lg p-4 mb-4 border border-primary/20">
                      <div className="text-[10px] font-bold text-primary uppercase mb-1">PREDICTED WINNER</div>
                      <div className="text-xl font-headline font-bold text-white uppercase italic">{pred.predictedWinner}</div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase mb-2">KEY PLAYER MATCHUPS</div>
                        <div className="flex flex-wrap gap-2">
                          {pred.keyPlayerMatchups.map((match: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-[10px] border-white/10">{match}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">ANALYSIS</div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{pred.analysis}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button onClick={() => setPredictions(null)} variant="ghost" className="w-full text-muted-foreground text-xs uppercase">
                Clear Predictions
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
